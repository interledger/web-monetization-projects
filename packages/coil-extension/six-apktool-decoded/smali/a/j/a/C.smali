.class final La/j/a/C;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/j/a/E;->b(La/j/a/N;Landroid/view/ViewGroup;Landroid/view/View;La/d/b;La/j/a/E$a;Ljava/util/ArrayList;Ljava/util/ArrayList;Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x8
    name = null
.end annotation


# instance fields
.field final synthetic a:La/j/a/g;

.field final synthetic b:La/j/a/g;

.field final synthetic c:Z

.field final synthetic d:La/d/b;

.field final synthetic e:Landroid/view/View;

.field final synthetic f:La/j/a/N;

.field final synthetic g:Landroid/graphics/Rect;


# direct methods
.method constructor <init>(La/j/a/g;La/j/a/g;ZLa/d/b;Landroid/view/View;La/j/a/N;Landroid/graphics/Rect;)V
    .locals 0

    iput-object p1, p0, La/j/a/C;->a:La/j/a/g;

    iput-object p2, p0, La/j/a/C;->b:La/j/a/g;

    iput-boolean p3, p0, La/j/a/C;->c:Z

    iput-object p4, p0, La/j/a/C;->d:La/d/b;

    iput-object p5, p0, La/j/a/C;->e:Landroid/view/View;

    iput-object p6, p0, La/j/a/C;->f:La/j/a/N;

    iput-object p7, p0, La/j/a/C;->g:Landroid/graphics/Rect;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 5

    iget-object v0, p0, La/j/a/C;->a:La/j/a/g;

    iget-object v1, p0, La/j/a/C;->b:La/j/a/g;

    iget-boolean v2, p0, La/j/a/C;->c:Z

    iget-object v3, p0, La/j/a/C;->d:La/d/b;

    const/4 v4, 0x0

    invoke-static {v0, v1, v2, v3, v4}, La/j/a/E;->a(La/j/a/g;La/j/a/g;ZLa/d/b;Z)V

    iget-object v0, p0, La/j/a/C;->e:Landroid/view/View;

    if-eqz v0, :cond_0

    iget-object v1, p0, La/j/a/C;->f:La/j/a/N;

    iget-object v2, p0, La/j/a/C;->g:Landroid/graphics/Rect;

    invoke-virtual {v1, v0, v2}, La/j/a/N;->a(Landroid/view/View;Landroid/graphics/Rect;)V

    :cond_0
    return-void
.end method
