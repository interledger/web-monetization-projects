.class La/a/b/a/c;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/a/b/a/d;->a(I)Z
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/a/b/a/d;


# direct methods
.method constructor <init>(La/a/b/a/d;)V
    .locals 0

    iput-object p1, p0, La/a/b/a/c;->a:La/a/b/a/d;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 2

    iget-object v0, p0, La/a/b/a/c;->a:La/a/b/a/d;

    const/4 v1, 0x1

    invoke-virtual {v0, v1}, La/a/b/a/d;->a(Z)V

    iget-object v0, p0, La/a/b/a/c;->a:La/a/b/a/d;

    invoke-virtual {v0}, Landroid/graphics/drawable/Drawable;->invalidateSelf()V

    return-void
.end method
