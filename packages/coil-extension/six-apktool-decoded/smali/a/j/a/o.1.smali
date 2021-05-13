.class La/j/a/o;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/j/a/p;->onAnimationEnd(Landroid/view/animation/Animation;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/j/a/p;


# direct methods
.method constructor <init>(La/j/a/p;)V
    .locals 0

    iput-object p1, p0, La/j/a/o;->a:La/j/a/p;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 7

    iget-object v0, p0, La/j/a/o;->a:La/j/a/p;

    iget-object v0, v0, La/j/a/p;->c:La/j/a/g;

    invoke-virtual {v0}, La/j/a/g;->g()Landroid/view/View;

    move-result-object v0

    if-eqz v0, :cond_0

    iget-object v0, p0, La/j/a/o;->a:La/j/a/p;

    iget-object v0, v0, La/j/a/p;->c:La/j/a/g;

    const/4 v1, 0x0

    invoke-virtual {v0, v1}, La/j/a/g;->a(Landroid/view/View;)V

    iget-object v0, p0, La/j/a/o;->a:La/j/a/p;

    iget-object v1, v0, La/j/a/p;->d:La/j/a/t;

    iget-object v2, v0, La/j/a/p;->c:La/j/a/g;

    invoke-virtual {v2}, La/j/a/g;->x()I

    move-result v3

    const/4 v4, 0x0

    const/4 v5, 0x0

    const/4 v6, 0x0

    invoke-virtual/range {v1 .. v6}, La/j/a/t;->a(La/j/a/g;IIIZ)V

    :cond_0
    return-void
.end method
