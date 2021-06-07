.class La/j/a/q;
.super Landroid/animation/AnimatorListenerAdapter;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/j/a/t;->a(La/j/a/g;La/j/a/t$c;I)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroid/view/ViewGroup;

.field final synthetic b:Landroid/view/View;

.field final synthetic c:La/j/a/g;

.field final synthetic d:La/j/a/t;


# direct methods
.method constructor <init>(La/j/a/t;Landroid/view/ViewGroup;Landroid/view/View;La/j/a/g;)V
    .locals 0

    iput-object p1, p0, La/j/a/q;->d:La/j/a/t;

    iput-object p2, p0, La/j/a/q;->a:Landroid/view/ViewGroup;

    iput-object p3, p0, La/j/a/q;->b:Landroid/view/View;

    iput-object p4, p0, La/j/a/q;->c:La/j/a/g;

    invoke-direct {p0}, Landroid/animation/AnimatorListenerAdapter;-><init>()V

    return-void
.end method


# virtual methods
.method public onAnimationEnd(Landroid/animation/Animator;)V
    .locals 6

    iget-object p1, p0, La/j/a/q;->a:Landroid/view/ViewGroup;

    iget-object v0, p0, La/j/a/q;->b:Landroid/view/View;

    invoke-virtual {p1, v0}, Landroid/view/ViewGroup;->endViewTransition(Landroid/view/View;)V

    iget-object p1, p0, La/j/a/q;->c:La/j/a/g;

    invoke-virtual {p1}, La/j/a/g;->h()Landroid/animation/Animator;

    move-result-object p1

    iget-object v0, p0, La/j/a/q;->c:La/j/a/g;

    const/4 v1, 0x0

    invoke-virtual {v0, v1}, La/j/a/g;->a(Landroid/animation/Animator;)V

    if-eqz p1, :cond_0

    iget-object p1, p0, La/j/a/q;->a:Landroid/view/ViewGroup;

    iget-object v0, p0, La/j/a/q;->b:Landroid/view/View;

    invoke-virtual {p1, v0}, Landroid/view/ViewGroup;->indexOfChild(Landroid/view/View;)I

    move-result p1

    if-gez p1, :cond_0

    iget-object v0, p0, La/j/a/q;->d:La/j/a/t;

    iget-object v1, p0, La/j/a/q;->c:La/j/a/g;

    invoke-virtual {v1}, La/j/a/g;->x()I

    move-result v2

    const/4 v3, 0x0

    const/4 v4, 0x0

    const/4 v5, 0x0

    invoke-virtual/range {v0 .. v5}, La/j/a/t;->a(La/j/a/g;IIIZ)V

    :cond_0
    return-void
.end method
