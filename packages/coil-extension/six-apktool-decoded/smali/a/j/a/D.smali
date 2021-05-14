.class final La/j/a/D;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/j/a/E;->a(La/j/a/N;Landroid/view/ViewGroup;Landroid/view/View;La/d/b;La/j/a/E$a;Ljava/util/ArrayList;Ljava/util/ArrayList;Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x8
    name = null
.end annotation


# instance fields
.field final synthetic a:La/j/a/N;

.field final synthetic b:La/d/b;

.field final synthetic c:Ljava/lang/Object;

.field final synthetic d:La/j/a/E$a;

.field final synthetic e:Ljava/util/ArrayList;

.field final synthetic f:Landroid/view/View;

.field final synthetic g:La/j/a/g;

.field final synthetic h:La/j/a/g;

.field final synthetic i:Z

.field final synthetic j:Ljava/util/ArrayList;

.field final synthetic k:Ljava/lang/Object;

.field final synthetic l:Landroid/graphics/Rect;


# direct methods
.method constructor <init>(La/j/a/N;La/d/b;Ljava/lang/Object;La/j/a/E$a;Ljava/util/ArrayList;Landroid/view/View;La/j/a/g;La/j/a/g;ZLjava/util/ArrayList;Ljava/lang/Object;Landroid/graphics/Rect;)V
    .locals 0

    iput-object p1, p0, La/j/a/D;->a:La/j/a/N;

    iput-object p2, p0, La/j/a/D;->b:La/d/b;

    iput-object p3, p0, La/j/a/D;->c:Ljava/lang/Object;

    iput-object p4, p0, La/j/a/D;->d:La/j/a/E$a;

    iput-object p5, p0, La/j/a/D;->e:Ljava/util/ArrayList;

    iput-object p6, p0, La/j/a/D;->f:Landroid/view/View;

    iput-object p7, p0, La/j/a/D;->g:La/j/a/g;

    iput-object p8, p0, La/j/a/D;->h:La/j/a/g;

    iput-boolean p9, p0, La/j/a/D;->i:Z

    iput-object p10, p0, La/j/a/D;->j:Ljava/util/ArrayList;

    iput-object p11, p0, La/j/a/D;->k:Ljava/lang/Object;

    iput-object p12, p0, La/j/a/D;->l:Landroid/graphics/Rect;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 5

    iget-object v0, p0, La/j/a/D;->a:La/j/a/N;

    iget-object v1, p0, La/j/a/D;->b:La/d/b;

    iget-object v2, p0, La/j/a/D;->c:Ljava/lang/Object;

    iget-object v3, p0, La/j/a/D;->d:La/j/a/E$a;

    invoke-static {v0, v1, v2, v3}, La/j/a/E;->a(La/j/a/N;La/d/b;Ljava/lang/Object;La/j/a/E$a;)La/d/b;

    move-result-object v0

    if-eqz v0, :cond_0

    iget-object v1, p0, La/j/a/D;->e:Ljava/util/ArrayList;

    invoke-virtual {v0}, La/d/b;->values()Ljava/util/Collection;

    move-result-object v2

    invoke-virtual {v1, v2}, Ljava/util/ArrayList;->addAll(Ljava/util/Collection;)Z

    iget-object v1, p0, La/j/a/D;->e:Ljava/util/ArrayList;

    iget-object v2, p0, La/j/a/D;->f:Landroid/view/View;

    invoke-virtual {v1, v2}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    :cond_0
    iget-object v1, p0, La/j/a/D;->g:La/j/a/g;

    iget-object v2, p0, La/j/a/D;->h:La/j/a/g;

    iget-boolean v3, p0, La/j/a/D;->i:Z

    const/4 v4, 0x0

    invoke-static {v1, v2, v3, v0, v4}, La/j/a/E;->a(La/j/a/g;La/j/a/g;ZLa/d/b;Z)V

    iget-object v1, p0, La/j/a/D;->c:Ljava/lang/Object;

    if-eqz v1, :cond_1

    iget-object v2, p0, La/j/a/D;->a:La/j/a/N;

    iget-object v3, p0, La/j/a/D;->j:Ljava/util/ArrayList;

    iget-object v4, p0, La/j/a/D;->e:Ljava/util/ArrayList;

    invoke-virtual {v2, v1, v3, v4}, La/j/a/N;->b(Ljava/lang/Object;Ljava/util/ArrayList;Ljava/util/ArrayList;)V

    iget-object v1, p0, La/j/a/D;->d:La/j/a/E$a;

    iget-object v2, p0, La/j/a/D;->k:Ljava/lang/Object;

    iget-boolean v3, p0, La/j/a/D;->i:Z

    invoke-static {v0, v1, v2, v3}, La/j/a/E;->a(La/d/b;La/j/a/E$a;Ljava/lang/Object;Z)Landroid/view/View;

    move-result-object v0

    if-eqz v0, :cond_1

    iget-object v1, p0, La/j/a/D;->a:La/j/a/N;

    iget-object v2, p0, La/j/a/D;->l:Landroid/graphics/Rect;

    invoke-virtual {v1, v0, v2}, La/j/a/N;->a(Landroid/view/View;Landroid/graphics/Rect;)V

    :cond_1
    return-void
.end method
